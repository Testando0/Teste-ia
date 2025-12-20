// api/gerar.js
const puter = require('puter-js-sdk'); 

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt vazio' });
    }

    try {
        // Usa o SDK da Puter conforme: https://developer.puter.com/tutorials/free-unlimited-openai-api/
        const image = await puter.ai.txt2img(prompt);
        
        // Retorna a URL da imagem (blob ou data-uri) gerada pela Puter
        return res.status(200).json({ url: image.src });
    } catch (error) {
        console.error('Erro Puter:', error);
        return res.status(500).json({ error: 'Erro ao gerar imagem via Puter SDK' });
    }
}
