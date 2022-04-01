import { ComponentType, MessageFlags, InteractionResponseType, ButtonStyle } from 'discord-api-types/v10';
import { respond } from '../util/respond';

export function handleSelectMenu(
    type: InteractionResponseType,
    customId: string,
    content: string,
    options: any[],
    ephemeral = false
) {
    return new respond({
        type,
        data: {
            content,
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.SelectMenu,
                            custom_id: customId,
                            options
                        }
                    ]
                }
            ],
            flags: ephemeral ? MessageFlags.Ephemeral : 0
        }
    })
}


export function handleButton(
    type: InteractionResponseType,
    content: string,
    style: ButtonStyle,
    label?: string,
    customId?: string,
    url?: string,
    ephemeral = false
) {
    return new respond({
        type,
        data: {
            content,
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            custom_id: customId,
                            style,
                            url,
                            label
                        }
                    ]
                }
            ],
            flags: ephemeral ? MessageFlags.Ephemeral : 0
        }
    })
}