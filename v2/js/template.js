export default {
    index: [
        {
            div: {
                id: 'root'
            }
        },
        {
            div: {
                id: 'card-link',
                class: 'w100'
            }
        },
        {
            footer: {
                class: 'fix w100'
            }
        }
    ],
    container: {
        section: {
            id: 'container-pizzas'
        }
    },
    templatePizzas: [
        {
            h2: {
                class: 'sabores'
            }
        },
        {
            p: {
                class: 'pizza'
            }
        }
    ],
    card_pizzas: [
        {
            div: {
                class: 'card_pizzas container flex'
            }
        },
        {
            class: 'pizza'
        }
    ],
    card_btn: {
        div: {
            class: 'card_btn'
        }
    },
    cardLink: [
        ['span', 'Pronto(a) para pedir? Clique '],
        [
            {
                a: {
                    href: '#pedido'
                }
            },
            'aqui!'
        ]
    ],
    copyright: [
        {
            p: {
                id: 'copyright'
            }
        },
        'Matsa \u00A9 2021 - Josias Fontes Alves'
    ],
    valor: [25, 25, 35]
}