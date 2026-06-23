<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// O upload de arquivos multipart/form-data pode disparar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

// A senha configurada para o painel (deve ser a mesma do save.php)
$config_password = "#admiguel1817A"; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar a senha (passada via POST)
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    if ($password !== $config_password) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Senha incorreta!"]);
        exit;
    }

    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Nenhuma imagem foi enviada."]);
        exit;
    }

    $file = $_FILES['image'];
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    // Validar tipo MIME
    if (!in_array($file['type'], $allowed_types)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Formato de arquivo inválido. Apenas JPG, PNG, GIF e WEBP são permitidos."]);
        exit;
    }

    // Limitar tamanho a 5MB
    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "O arquivo é muito grande. Tamanho máximo permitido: 5MB."]);
        exit;
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    if (empty($ext)) {
        // Fallback de extensão de acordo com o tipo MIME
        switch ($file['type']) {
            case 'image/png': $ext = 'png'; break;
            case 'image/webp': $ext = 'webp'; break;
            case 'image/gif': $ext = 'gif'; break;
            default: $ext = 'jpg';
        }
    }
    
    // Garantir que a extensão seja em minúsculas
    $ext = strtolower($ext);
    
    // Nome único para evitar conflitos e caracteres especiais
    $new_filename = 'upload_' . time() . '_' . uniqid() . '.' . $ext;
    
    // Pasta de destino (assets/images)
    $target_dir = __DIR__ . '/../assets/images/';
    
    // Garantir que a pasta existe
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0755, true);
    }
    
    $target_path = $target_dir . $new_filename;

    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        // URL relativa a ser salva no JSON
        $relative_url = '/assets/images/' . $new_filename;
        echo json_encode([
            "status" => "success",
            "message" => "Imagem enviada com sucesso!",
            "url" => $relative_url
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Falha ao salvar o arquivo no servidor. Verifique as permissões de escrita da pasta public/assets/images."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
}
?>
