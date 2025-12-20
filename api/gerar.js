// api/gerar.js
import puter from '@puter/sdk';

export default async function handler(req, res) {
    // Configuração de CORS para permitir que seu HTML acesse a API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: 'Prompt necessário' });

    try {
        // O Puter SDK no Node.js acessa o modelo dall-e-3 gratuitamente
        // Conforme a documentação de "Free Unlimited"
        const response = await puter.ai.txt2img(prompt, { model: 'dall-e-3', task: 'text-to-image' });
        
        // O Puter retorna um objeto que contém a URL ou o Blob
        // Vamos extrair a URL da imagem gerada
        const imageUrl = response.src; 

        return res.status(200).json({ url: imageUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Falha ao gerar imagem no Puter' });
    }
}
