const API = "https://fortnite-api.com/v2/cosmetics/br";


let cosmetics = [];
let filtered = [];

const grid = document.getElementById("grid");
const status = document.getElementById("status");

const search = document.getElementById("search");
const sort = document.getElementById("sort");



const rarityColors = {

    common:"#9aa4b2",
    uncommon:"#54d96b",
    rare:"#4b9cff",
    epic:"#b45cff",
    legendary:"#ff9d3d",
    mythic:"#ffd447"

};





async function loadCosmetics(){


    try{


        status.innerHTML =
        "Downloading Fortnite cosmetics...";



        const response =
        await fetch(API);



        const json =
        await response.json();



        cosmetics = json.data.map(item => ({


            id:item.id,


            name:item.name,


            type:
            item.type?.displayValue ||
            "Unknown",



            rarity:
            item.rarity?.value ||
            "common",



            rarityName:
            item.rarity?.displayValue ||
            "Common",



            series:
            item.series?.value ||
            "",



            image:

            item.images?.featured ||

            item.images?.icon ||
 
            item.images?.largeIcon ||

            item.images?.smallIcon ||

            "https://via.placeholder.com/300",



            description:
            item.description ||
            "No description",


            introduced:
            item.introduction?.text ||
            "Unknown"



        }));




        filtered=[...cosmetics];



        status.innerHTML =
        `Loaded ${cosmetics.length.toLocaleString()} Fortnite cosmetics`;



        sortItems();

        render();



    }

    catch(error){


        console.error(error);


        status.innerHTML =
        "Failed loading cosmetics";


    }


}









function render(){


    grid.innerHTML="";



    filtered.slice(0,500).forEach(item=>{


        const card =
        document.createElement("div");



        card.className="card";



        let color =
        rarityColors[item.rarity] ||
        "#777";



        card.innerHTML = `


        <img loading="lazy"
        src="${item.image}">



        <div class="info">


        <b>${item.name}</b>


        <br>


        ${item.type}


        <br>


        <span class="rarity"
        style="color:${color}">

        ${item.rarityName}

        </span>


        </div>


        `;



        grid.appendChild(card);



    });


}









function sortItems(){


    if(sort.value==="oldest"){


        filtered.sort((a,b)=>

            new Date(a.releaseDate) -
            new Date(b.releaseDate)

        );

    }




    if(sort.value==="newest"){


        filtered.sort((a,b)=>

            new Date(b.releaseDate) -
            new Date(a.releaseDate)

        );


    }




    if(sort.value==="name"){


        filtered.sort((a,b)=>

            a.name.localeCompare(b.name)

        );


    }


}









search.addEventListener("input",()=>{


    let text =
    search.value.toLowerCase();



    filtered =
    cosmetics.filter(item=>

        item.name
        .toLowerCase()
        .includes(text)

    );



    sortItems();

    render();


});









sort.addEventListener("change",()=>{


    sortItems();

    render();


});









document.querySelectorAll("button")
.forEach(button=>{


    button.onclick=()=>{


        let type =
        button.dataset.type;



        if(type==="all"){


            filtered=[...cosmetics];


        }

        else{


            filtered =
            cosmetics.filter(item=>

                item.type===type

            );


        }



        sortItems();

        render();



    };


});









loadCosmetics();
