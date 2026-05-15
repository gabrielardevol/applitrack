import { Injectable } from "@angular/core";
import { environment } from "environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class LlmService<T> {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  groqApiKey = environment.GROQ_KEY;
  constructor() { }

  async apiCall(message: string, model: string) {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.groqApiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }]
      }),
    })
  }

  async callLlmApi(message: string): Promise<T> {
    let data = await this.apiCall(message, 'llama-3.3-70b-versatile')

    let response = await data.json().then(
      //todo: impleent groq sdk ?
      r => {
        let message = (r as any)['choices']?.[0]?.['message']?.['content'];
        return JSON.parse(message)
      }
    ).catch(
      error => console.error('error fetching LLM:', error)
    )

    if (!response) {
      data = await this.apiCall(message, 'meta-llama/llama-4-scout-17b-16e-instruct')
      response = await data.json().then(
        r => {
          let message = (r as any)['choices']?.[0]?.['message']?.['content'];
          console.log('message', message)
          return JSON.parse(message.replace(/^```|```$/g, "").trim())
        }
      ).catch(
        error => console.error('error fetching LLM:', error)
      )
    }

    console.log('response', response)

    return response ?? "";
  }

}
