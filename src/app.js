/**
 * Created by Gareth on 19/02/14.
 */

var messages = [
        {from:"CUCM", to:"SBC",message:"INVITE"},
        {from:"SBC", to:"FS01",message:"INVITE"},
        {from:"FS01", to:"SBC",message:"INVITE"},
        {from:"SBC", to:"CS2K",message:"INVITE"},
        {from:"CS2K", to:"SBC",message:"200 OK"},
        {from:"SBC", to:"FS01",message:"200 OK"}
];

var layout = new LayoutEngine();
layout.addMessages(messages);

var renderer = new RenderEngine(layout);

renderer.Init();
renderer.Draw();

setTimeout(function(){
        console.log("1");
        layout.addMessages(  [{from:"FS01", to:"SBC",message:"200 OK"} ]);
        layout.addMessages(  [{from:"SBC", to:"CUCM",message:"200 OK"} ]);

        renderer.Draw();
    },
    3000);

setTimeout(function(){
        console.log("2");
        layout.addMessages(  [{from:"CUCM", to:"SBC",message:"ACK"} ]);
        layout.addMessages(  [{from:"SBC", to:"FS01",message:"ACK"} ]);
        renderer.Draw();
    },
    6000);







