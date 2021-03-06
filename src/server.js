import { Router } from "itty-router";
import { verifyKey } from "discord-interactions";
import {
  InteractionType,
  InteractionResponseType,
  MessageFlags,
  ButtonStyle,
  ComponentType
} from "discord-api-types/v9";
import { respond } from "./util/respond";
import { fetchCreditsData, fetchXpData } from "./handlers/Top";
import { fetchStats } from "./handlers/Stats";
import { GUILDS_EMOJI, MEMBERS_EMOJI } from "./util/constants";
import millify from "millify";


const router = Router();

router.get('/', (request, env) => {
  return new Response(`👋 ${env.CLIENT_ID} use this endpoint to keep bot alive.`);
});


router.post('/', async (request, env) => {
  const interaction = await request.json();
  if (interaction.type === InteractionType.Ping) {
    return new respond({
      type: InteractionResponseType.Pong
    })
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.data.name === 'invite') {
          return new respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `[Click to use bot 🥳](https://discord.com/oauth2/authorize?client_id=${env.CLIENT_ID}&scope=applications.commands)`,
              flags: MessageFlags.Ephemeral
            }
          })
        }

        if (interaction.data.name === 'stats') {
          await new respond({
            type: InteractionResponseType.DeferredChannelMessageWithSource
          })
          const data = await fetchStats();
          return new respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `${GUILDS_EMOJI} **Guilds:** ${data.guilds.toLocaleString()} **(${millify(data.guilds)})**\n${MEMBERS_EMOJI} **Members:** ${data.members.toLocaleString()} **(${millify(data.members)})**`
            }
          })
        }

        if (interaction.data.name === 'top') {
          await new respond({
            type: InteractionResponseType.DeferredChannelMessageWithSource
          })
          const type = interaction.data.options[0].value;
          const limit = interaction.data.options[1].value;
          if (type === 'credits') {
            const data = await fetchCreditsData(limit ? limit : 10);
            return new respond({
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                content: data.join("\n"),
                components: [
                  {
                    type: ComponentType.ActionRow,
                    components: [
                      {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        url: "https://probot.io/top/credits",
                        label: "View Richest 100 billionaires"
                      }
                    ]
                  }
                ]
              }
            })
          }
          if (type === 'xp') {
            const data = await fetchXpData(limit ? limit : 10);
            return new respond({
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                content: data.join("\n"),
                components: [
                  {
                    type: ComponentType.ActionRow,
                    components: [
                      {
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        url: "https://probot.io/top/xp",
                        label: "View Top 100 By Xp"
                      }
                    ]
                  }
                ]
              }
            })
          }
        }

        // no command response
        console.error('Unknown Command');
        return respond({ error: 'Unknown Type' }, { status: 400 });
    }
  }
);
// Return "not found" response for all pages exept "/" route
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
  /**
   * Every request to a worker will start in the `fetch` method.
   * Verify the signature with the request, and dispatch to the router.
   * @param {*} request A Fetch Request object
   * @param {*} env A map of key/value pairs with env vars and secrets from the cloudflare env.
   * @returns
   */
  async fetch(request, env) {
    if (request.method === 'POST') {
      const signature = request.headers.get('x-signature-ed25519');
      const timestamp = request.headers.get('x-signature-timestamp');
      const body = await request.clone().arrayBuffer();
      const isValidRequest = verifyKey(
        body,
        signature,
        timestamp,
        env.PUBLIC_KEY
      );
      if (!isValidRequest) {
        console.error('Invalid Request');
        return new Response('Bad request signature.', { status: 401 });
      }
    }

    // Dispatch the request to the appropriate route
    return router.handle(request, env);
  },
};