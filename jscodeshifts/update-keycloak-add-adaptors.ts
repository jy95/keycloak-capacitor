import type { API, FileInfo } from 'jscodeshift';

// function to generate the if statement
function generateAdapterCode(adapterKey: 'capacitor-native' | 'capacitor', api: API) {
    const j = api.jscodeshift;

    // redirectUri method
    const redirectUriMethod = j.property(
        "init",
        j.identifier("Identifier"),
        j.functionExpression(
            null,
            [
                j.identifier("options")
            ],
            j.blockStatement([
                j.ifStatement(
                    // test
                    j.logicalExpression(
                        "&&",
                        j.identifier("options"),
                        j.memberExpression(
                            j.identifier("options"),
                            j.identifier("redirectUri")
                        )
                    ),
                    // consequent
                    j.blockStatement([
                        j.returnStatement(
                            j.memberExpression(
                                j.identifier("options"),
                                j.identifier("redirectUri")
                            )
                        )
                    ]),
                    // alternate
                    j.ifStatement(
                        // test
                        j.memberExpression(
                            j.identifier("kc"),
                            j.identifier("redirectUri")
                        ),
                        // consequent
                        j.blockStatement([
                            j.returnStatement(
                                j.memberExpression(
                                    j.identifier("kc"),
                                    j.identifier("redirectUri")
                                )
                            )
                        ]),
                        // alternate
                        j.blockStatement([
                            j.returnStatement(
                                j.literal("http://localhost")
                            )
                        ])
                    )
                )
            ])
        )
    );

    // login method
    const loginMethod = j.property(
        'init', 
        j.identifier("login"),
        j.functionExpression(
            null,
            [
                j.identifier("options")
            ],
            j.blockStatement([
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("promise"),
                            j.callExpression(
                                j.identifier("createPromise"),
                                []
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("loginUrl"),
                            j.callExpression(
                                j.memberExpression(
                                    j.identifier("kc"),
                                    j.identifier("createLoginUrl")
                                ),
                                [
                                    j.identifier("options")
                                ]
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "const",
                    [
                        j.variableDeclarator(
                            j.identifier("addUrlListener"),
                            j.callExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.memberExpression(
                                                j.identifier("window"),
                                                j.identifier("Capacitor")
                                            ),
                                            j.identifier("Plugins")
                                        ),
                                        j.identifier("App")
                                    ),
                                    j.identifier("addListener")
                                ),
                                [
                                    j.literal("appUrlOpen"),
                                    j.arrowFunctionExpression(
                                        [
                                            j.identifier("data")
                                        ],
                                        j.blockStatement([
                                            // Basic capacitor has an extra instruction to add
                                            ...(adapterKey === "capacitor-native" ? [] : [
                                                j.expressionStatement(
                                                    j.callExpression(
                                                        j.memberExpression(
                                                            j.memberExpression(
                                                                j.memberExpression(
                                                                    j.memberExpression(
                                                                        j.identifier("window"),
                                                                        j.identifier("cordova")
                                                                    ),
                                                                    j.identifier("plugins")
                                                                ),
                                                                j.identifier("browsertab")
                                                            ),
                                                            j.identifier("close")
                                                        ),
                                                        []
                                                    )
                                                )
                                            ]),
                                            // Rest is common in two
                                            j.variableDeclaration(
                                                'var',
                                                [
                                                    j.variableDeclarator(
                                                        j.identifier("oauth"),
                                                        j.callExpression(
                                                            j.identifier("parseCallback"),
                                                            [
                                                                j.memberExpression(
                                                                    j.identifier("data"),
                                                                    j.identifier("url")
                                                                )
                                                            ]
                                                        )
                                                    )
                                                ]
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.identifier("processCallback"),
                                                    [
                                                        j.identifier("oauth"),
                                                        j.identifier("promise")
                                                    ]
                                                )
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.memberExpression(
                                                        j.identifier("addUrlListener"),
                                                        j.identifier("remove"),
                                                    ),
                                                    []
                                                )
                                            )
                                        ])
                                    )
                                ]
                            )
                        )
                    ]
                ),
                j.expressionStatement(
                    (adapterKey === "capacitor") 
                        ? j.callExpression(
                            j.memberExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.identifier("window"),
                                            j.identifier("cordova")
                                        ),
                                        j.identifier("plugins")
                                    ),
                                    j.identifier("browsertab")
                                ),
                                j.identifier("openUrl")
                            ),
                            [
                                j.identifier("loginUrl")
                            ]
                        ) 
                        : j.callExpression(
                            j.memberExpression(
                                j.identifier("window"),
                                j.identifier("open")
                            ),
                            [
                                j.identifier("loginUrl"),
                                j.literal("_system")
                            ]
                        )
                ),
                // same return
                j.returnStatement(
                    j.memberExpression(
                        j.identifier("promise"),
                        j.identifier("promise"),
                    )
                )
            ])
        )
    );

    // logout method
    const logoutMethod = j.property(
        'init', 
        j.identifier("logout"),
        j.functionExpression(
            null,
            [
                j.identifier("options")
            ],
            j.blockStatement([
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("promise"),
                            j.callExpression(
                                j.identifier("createPromise"),
                                []
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("logoutUrl"),
                            j.callExpression(
                                j.memberExpression(
                                    j.identifier("kc"),
                                    j.identifier("createLogoutUrl")
                                ),
                                [
                                    j.identifier("options")
                                ]
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "const",
                    [
                        j.variableDeclarator(
                            j.identifier("addUrlListener"),
                            j.callExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.memberExpression(
                                                j.identifier("window"),
                                                j.identifier("Capacitor")
                                            ),
                                            j.identifier("Plugins")
                                        ),
                                        j.identifier("App")
                                    ),
                                    j.identifier("addListener")
                                ),
                                [
                                    j.literal("appUrlOpen"),
                                    j.arrowFunctionExpression(
                                        [
                                            j.identifier("data")
                                        ],
                                        j.blockStatement([
                                            // Basic capacitor has an extra instruction to add
                                            ...(adapterKey === "capacitor-native" ? [] : [
                                                j.expressionStatement(
                                                    j.callExpression(
                                                        j.memberExpression(
                                                            j.memberExpression(
                                                                j.memberExpression(
                                                                    j.memberExpression(
                                                                        j.identifier("window"),
                                                                        j.identifier("cordova")
                                                                    ),
                                                                    j.identifier("plugins")
                                                                ),
                                                                j.identifier("browsertab")
                                                            ),
                                                            j.identifier("close")
                                                        ),
                                                        []
                                                    )
                                                )
                                            ]),
                                            // Rest is common in two
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.memberExpression(
                                                        j.identifier("kc"),
                                                        j.identifier("clearToken"),
                                                    ),
                                                    []
                                                )
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.memberExpression(
                                                        j.identifier("promise"),
                                                        j.identifier("setSuccess"),
                                                    ),
                                                    []
                                                )
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.memberExpression(
                                                        j.identifier("addUrlListener"),
                                                        j.identifier("remove"),
                                                    ),
                                                    []
                                                )
                                            )
                                        ])
                                    )
                                ]
                            )
                        )
                    ]
                ),
                j.expressionStatement(
                    (adapterKey === "capacitor") 
                        ? j.callExpression(
                            j.memberExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.identifier("window"),
                                            j.identifier("cordova")
                                        ),
                                        j.identifier("plugins")
                                    ),
                                    j.identifier("browsertab")
                                ),
                                j.identifier("openUrl")
                            ),
                            [
                                j.identifier("logoutUrl")
                            ]
                        ) 
                        : j.callExpression(
                            j.memberExpression(
                                j.identifier("window"),
                                j.identifier("open")
                            ),
                            [
                                j.identifier("logoutUrl"),
                                j.literal("_system")
                            ]
                        )
                ),
                // same return
                j.returnStatement(
                    j.memberExpression(
                        j.identifier("promise"),
                        j.identifier("promise"),
                    )
                )
            ])
        )
    );

    const accountManagementMethod = j.property(
        "init",
        j.identifier("accountManagement"),
        j.functionExpression(
            null,
            [],
            j.blockStatement([
                j.variableDeclaration(
                    'var',
                    [
                        j.variableDeclarator(
                            j.identifier("accountUrl"),
                            j.callExpression(
                                j.memberExpression(
                                    j.identifier("kc"),
                                    j.identifier("createAccountUrl")
                                ),
                                []
                            )
                        )
                    ]
                ),
                j.ifStatement(
                    // test
                    j.binaryExpression(
                        '!==',
                        j.unaryExpression(
                            "typeof",
                            j.identifier("accountUrl")
                        ),
                        j.literal("undefined")
                    ),
                    // consequent
                    j.blockStatement([
                        j.expressionStatement(
                            (adapterKey === "capacitor") 
                            ? j.callExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.memberExpression(
                                                j.identifier("window"),
                                                j.identifier("cordova")
                                            ),
                                            j.identifier("plugins")
                                        ),
                                        j.identifier("browsertab")
                                    ),
                                    j.identifier("openUrl")
                                ),
                                [
                                    j.identifier("accountUrl")
                                ]
                            ) 
                            : j.callExpression(
                                j.memberExpression(
                                    j.identifier("window"),
                                    j.identifier("open")
                                ),
                                [
                                    j.identifier("accountUrl"),
                                    j.literal("_system")
                                ]
                            )
                        )
                    ]),
                    // alternate
                    j.blockStatement(
                        [
                            j.throwStatement(
                                j.literal("Not supported by the OIDC server")
                            )
                        ]
                    )
                )
            ])
        )
    )

    const registerMethod = j.property(
        "init",
        j.identifier("register"),
        j.functionExpression(
            null,
            [
                j.identifier("options")
            ],
            j.blockStatement([
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("promise"),
                            j.callExpression(
                                j.identifier("createPromise"),
                                []
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "var",
                    [
                        j.variableDeclarator(
                            j.identifier("registerUrl"),
                            j.callExpression(
                                j.memberExpression(
                                    j.identifier("kc"),
                                    j.identifier("createRegisterUrl")
                                ),
                                [
                                    j.identifier("options")
                                ]
                            )
                        )
                    ]
                ),
                j.variableDeclaration(
                    "const",
                    [
                        j.variableDeclarator(
                            j.identifier("addUrlListener"),
                            j.callExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.memberExpression(
                                                j.identifier("window"),
                                                j.identifier("Capacitor")
                                            ),
                                            j.identifier("Plugins")
                                        ),
                                        j.identifier("App")
                                    ),
                                    j.identifier("addListener")
                                ),
                                [
                                    j.literal("appUrlOpen"),
                                    j.arrowFunctionExpression(
                                        [
                                            j.identifier("data")
                                        ],
                                        j.blockStatement([
                                            // Basic capacitor has an extra instruction to add
                                            ...(adapterKey === "capacitor-native" ? [] : [
                                                j.expressionStatement(
                                                    j.callExpression(
                                                        j.memberExpression(
                                                            j.memberExpression(
                                                                j.memberExpression(
                                                                    j.memberExpression(
                                                                        j.identifier("window"),
                                                                        j.identifier("cordova")
                                                                    ),
                                                                    j.identifier("plugins")
                                                                ),
                                                                j.identifier("browsertab")
                                                            ),
                                                            j.identifier("close")
                                                        ),
                                                        []
                                                    )
                                                )
                                            ]),
                                            // Rest is common in two
                                            j.variableDeclaration(
                                                'var',
                                                [
                                                    j.variableDeclarator(
                                                        j.identifier("oauth"),
                                                        j.callExpression(
                                                            j.identifier("parseCallback"),
                                                            [
                                                                j.memberExpression(
                                                                    j.identifier("data"),
                                                                    j.identifier("url")
                                                                )
                                                            ]
                                                        )
                                                    )
                                                ]
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.identifier("processCallback"),
                                                    [
                                                        j.identifier("oauth"),
                                                        j.identifier("promise")
                                                    ]
                                                )
                                            ),
                                            j.expressionStatement(
                                                j.callExpression(
                                                    j.memberExpression(
                                                        j.identifier("addUrlListener"),
                                                        j.identifier("remove"),
                                                    ),
                                                    []
                                                )
                                            )
                                        ])
                                    )
                                ]
                            )
                        )
                    ]
                ),
                j.expressionStatement(
                    (adapterKey === "capacitor") 
                        ? j.callExpression(
                            j.memberExpression(
                                j.memberExpression(
                                    j.memberExpression(
                                        j.memberExpression(
                                            j.identifier("window"),
                                            j.identifier("cordova")
                                        ),
                                        j.identifier("plugins")
                                    ),
                                    j.identifier("browsertab")
                                ),
                                j.identifier("openUrl")
                            ),
                            [
                                j.identifier("registerUrl")
                            ]
                        ) 
                        : j.callExpression(
                            j.memberExpression(
                                j.identifier("window"),
                                j.identifier("open")
                            ),
                            [
                                j.identifier("registerUrl"),
                                j.literal("_system")
                            ]
                        )
                ),
                // same return
                j.returnStatement(
                    j.memberExpression(
                        j.identifier("promise"),
                        j.identifier("promise"),
                    )
                )
            ])
        )
    )

    // Notice that differences between two adapters is quite light so why ternary are used
    return j.ifStatement(
        j.binaryExpression(
            '==',
            j.identifier("type"),
            j.literal(adapterKey)
        ),
        j.blockStatement([
            j.expressionStatement(
                j.assignmentExpression(
                    '=',
                    j.memberExpression(
                        j.identifier("loginIframe"),
                        j.identifier("enable")
                    ),
                    j.literal(false)
                )
            ),
            j.returnStatement(
                j.objectExpression([
                    // login method
                    loginMethod,
                    // logout method
                    logoutMethod,
                    // register method
                    registerMethod,
                    // accountManagement method
                    accountManagementMethod,
                    // redirectUri method
                    redirectUriMethod
                ])
            )
        ])
    )
}

export default function transformer(file: FileInfo, api: API) {
    const j = api.jscodeshift;
    const root = j(file.source);

    return root
        .find(
            j.IfStatement,
            {
                test: {
                    operator: '==',
                    left: {
                        type: 'Identifier',
                        name: 'type'
                    },
                    right: {
                        type: "Literal",
                        value: "cordova-native"
                    }
                }
            }
        )
        // Add (type == 'capacitor-native') code
        .insertAfter(generateAdapterCode('capacitor-native', api))
        // Add (type == 'capacitor') code
        .insertAfter(generateAdapterCode('capacitor', api))
        .toSource();
}