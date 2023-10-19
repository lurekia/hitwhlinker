// import type { ChatMessage } from "@/types";


export async function chat(messageList) {
	const apiKey = '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'
	uni.request({
		url:"https://api.openai.com/v1/chat/completions",
		method:"POST",
		headers: {
		  Content-Type: "application/json",
		  Authorization: `Bearer ${apiKey}`,
		},
		body: {
		  model: "gpt-3.5-turbo",
		  // stream: true,
		  messages: messageList,
		}),
		success: (res) => {
			console.log(res);
		},
		fail: (err) => {
			console.log(err);
		}
	})
 
}
