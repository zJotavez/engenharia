<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// A senha configurada para o painel (pode ser alterada pelo usuário)
$config_password = "#Metal2026A"; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validar a senha
    if (!isset($input['password']) || $input['password'] !== $config_password) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Senha incorreta!"]);
        exit;
    }
    
    if (!isset($input['data'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Dados ausentes!"]);
        exit;
    }
    
    // Caminho para salvar o arquivo data.json (um nível acima da pasta api)
    $file_path = __DIR__ . '/../data.json';
    
    // Formata o JSON de forma legível e sem escapar caracteres acentuados
    $json_data = json_encode($input['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    if (file_put_contents($file_path, $json_data)) {
        echo json_encode(["status" => "success", "message" => "Dados salvos com sucesso!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Erro ao salvar os dados no servidor. Verifique as permissões de escrita na pasta public_html."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método não permitido."]);
}
?>
