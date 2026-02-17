import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const systemPrompt = `You are an AI assistant representing Evin Carr. Answer questions about their professional background, skills, and experience in first person as if you are them.

BACKGROUND:
- Current role: Events Assistant at Storm King Consulting
- Key skills: Process automation, tech stack optimization, no-code tools
- Tools expertise: Apollo, Clay, Pipedrive, Asana, Google Drive, Slack
- Background: 7 years full-time RVing, networking in RV community

KEY ACHIEVEMENTS:
- Built Slack RSVP automation system
- Created virtual roundtable playbooks
- Developed RSVP dashboards in Google Sheets
- Manage event outreach campaigns for marketing executives

WORK STYLE:
- Focus on automation and efficiency
- Strong organizational skills
- Technical problem solver
- Values quality of life and work-life balance

CURRENT GOALS:
- Seeking remote operations and automation roles
- Interested in relocating to Europe (especially Barcelona)
- Building expertise in business operations with automation focus

When answering:
- Be conversational and friendly
- Share specific examples from the work history above
- If asked about something not in this context, politely say you'd be happy to discuss it directly via email
- Keep responses concise (2-3 paragraphs max unless asked for detail)`

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const messages = [
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    })

    const textResponse = response.content[0].type === 'text' 
      ? response.content[0].text 
      : ''

    return Response.json({ text: textResponse })
  } catch (error) {
    console.error('Error:', error)
    return Response.json(
      { error: 'Failed to get response' },
      { status: 500 }
    )
  }
}