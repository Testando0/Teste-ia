const puter = require('puter-js-sdk');

export default async function handler(req, res) {
    // Só aceita POST para segurança
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'O prompt de imagem está vazio.' });
    }

    try {
        // Usa o SDK oficial da Puter para gerar imagem via DALL-E 3
        // Documentação: https://developer.puter.com/tutorials/free-unlimited-openai-api/
        const image = await puter.ai.txt2img(prompt);
        
        // Retorna o link da imagem gerada sem redirecionamento
        return res.status(200).json({ url: image.src });
    } catch (error) {
        console.error('Erro na Puter:', error);
        return res.status(500).json({ error: 'Erro ao processar imagem na Puter.js' });
    }
}
