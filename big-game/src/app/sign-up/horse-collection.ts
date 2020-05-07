
export class HorseCollection {
    horses: any = 
    [
        {
            name: "Paint Horse",
            coat: ["Bay Tobiano", "Chestnut Tobiano", "Chestnut Overo", "Cherry Bay Tobiano", "Liver Chestnut Tobiano", "Bay Overo", "Dark Bay Tobinao"],
            baseUrl: "paint",
            coatImage: ["bt", "ct", "co","cbt","lct","bo","do","dbt"],
            horseImage: ["p-bt","p-ct","p-co","p-lct", "p-bo", "p-do", "p-dbt"]
        },
        {
            name: "Akhal-Teke",
            coat: ["Dark Bay", "Chestnut", "Dun", "Dapple Grey", "Bay", "Flaxen Chestnut", "Cherry Bay"],
            baseUrl: "akhal",
            coatImage: ["db", "cn", "dun","dg","bay","fc","cb"],
            horseImage: ["at-db","at-cn","at-dun","at-dg", "at-bay", "at-fc", "at-cb"]
        },
        {
            name: "Purebred Spanish Horse",
            coat: ["Dapple Grey", "Light Grey", "Cherry Bay", "Black", "Dark Bay", "Bay", "Mouse Grey"],
            baseUrl: "pur",
            coatImage: ["dg", "lg", "cb","bl","db","bay","mg"],
            horseImage: ["pb-dg","pb-lg","pb-cb","pb-bl", "pb-db", "pb-bay", "pb-mg"]
        },
        {
            name: "Shetland (Pony)",
            coat: ["Chestnut", "Bay", "Dark Bay", "Cherry Bay", "Flaxen Chestnut", "Dapple Grey", "Liver Chestnut"],
            baseUrl: "shet",
            coatImage: ["ch", "bay", "db","cb","fc","dg","lc"],
            horseImage: ["sl-ch","sl-bay","sl-db","sl-cb", "sl-fc", "sl-dg", "sl-lc"]
        },
        {
            name: "Welsh (Pony)",
            coat: ["Chestnut", "Dark Bay", "Bay", "Cherry Bay", "Flaxen Chestnut", "Dapple Grey", "Liver Chestnut"],
            baseUrl: "wel",
            coatImage: ["ch", "db", "bay","cb","dg","bl"],
            horseImage: ["w-ch","w-db","w-bay","w-cb", "w-dg", "w-bl"]
        },
        {
            name: "Quarter Horse",
            coat: ["Chestnut", "Flaxen Chestnut", "Bay", "Black", "Cherry Bay", "Dark Bay", "Liver Chestnut"],
            baseUrl: "qrt",
            coatImage: ["ch", "fc", "bay","bl","cb","db", "lc"],
            horseImage: ["q-ch","q-fc","q-bay","q-bl", "q-cb", "q-db", "q-lc"]
        },
        {
            name: "Shagya Arabian",
            coat: ["Light Gray","Dapple Grey", "Fleabitten Grey", "Mouse Grey", "Bay", "Black", "Chestnut"],
            baseUrl: "shg",
            coatImage: ["lg", "dg", "fg","mg","bay","bl","ch"],
            horseImage: ["sh-lg","sh-dg","sh-fg","sh-mg","sh-bay","sh-bl","sh-ch"]
        },
        {
            name: "Nokota",
            coat: ["Roan", "Black", "Bay", "Black Overo", "Bay Overo", "Dark Bay", "Dark Bay Overo"],
            baseUrl: "nok",
            coatImage: ["ro", "bl", "bay", "blo", "byo", "db", "dbo"],
            horseImage: ["nk-ro", "nk-bl", "nk-bay", "nk-blo", "nk-byo", "nk-db", "nk-dbo"]
        },
        {
            name: "Canadian Horse",
            coat: ["Black", "Dark Bay", "Liver Chestnut", "Bay", "Cherry Bay", "Chestnut"],
            baseUrl: "can",
            coatImage: ["bl", "db", "lc", "bay", "cb", "ch"],
            horseImage: ["ca-bl", "ca-db", "ca-lc", "ca-bay", "ca-cb", "ca-ch"]
        },
        {
            name: "Newfoundland Pony (Pony)",
            coat: ["Dark Bay", "Cherry Bay", "Bay", "Chestnut", "Dapple Grey", "Light Grey", "Liver Chestnut"],
            baseUrl: "nfl",
            coatImage: ["db", "cb", "bay", "ch", "dg", "lg", "lc"],
            horseImage: ["nf-db", "nf-cb", "nf-bay", "nf-ch", "nf-dg", "nf-lg", "nf-lc"]
        },
    ]
    constructor() {}
}
