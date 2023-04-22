const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else  {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
    } 
}

// Login do bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`)
});
client.login(TOKEN)

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if (selected == "javascript"){
            await interaction.reply("Documentação do JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interaction.reply("Documentação do Python: https://docs.python.org/pt-br/3/tutorial/index.html")
        } else if (selected == "csharp") {
            await interaction.reply("Documentação do C#: https://dotnet.microsoft.com/en-us/learn/csharp")
        } else if (selected == "discord.js") {
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
    }

    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})
