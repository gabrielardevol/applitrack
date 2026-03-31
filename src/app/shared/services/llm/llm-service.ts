export class LlmService<T> {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  groqApiKey = '';
  constructor() { }

  async callLlmApi(): Promise<T> {
    const data = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: "return a json object with some random properties of your choice. Don't return any extra words, ONLY JSON OBJECT TO PARSE" }]
      }),
    })

    let response = await data.json().then(
      //todo: impleent groq sdk ?
      r => {
        let message = (r as any)['choices']?.[0]?.['message']?.['content'];
        return JSON.parse(message)
      }
    ).catch(
      error => console.error('error fetching LLM:', error)
    )
    return response ?? "";
  }

}
