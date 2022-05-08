let cards= [];
        fetch('https://asi2-backend-market.herokuapp.com/cards').then(res => res.json()).then(res => {
            cards = res
        });

        function getCard(name = "") {
            let card = cards.find(el => el.name.includes(name));
            return card;
        }
        
        const form = document.getElementById("searchForm");
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            initSearch();
        })
        
        function initSearch() {
            const search_value = document.getElementById('name_input');

            const card = getCard(search_value.value);
            if (card) {

                let template = document.querySelector("#selectedCard");
                let clone = document.importNode(template.content, true);

                newContent = clone.firstElementChild.innerHTML
                    .replace(/{{family_src}}/g, card.smallImgUrl)
                    .replace(/{{family_name}}/g, card.family)
                    .replace(/{{img_src}}/g, card.imgUrl)
                    .replace(/{{name}}/g, card.name)
                    .replace(/{{description}}/g, card.description)
                    .replace(/{{hp}}/g, card.hp)
                    .replace(/{{energy}}/g, card.energy)
                    .replace(/{{attack}}/g, card.attack)
                    .replace(/{{defense}}/g, card.defence);
                clone.firstElementChild.innerHTML = newContent;

                let cardContainer = document.querySelector("#cardContainer");
                cardContainer.appendChild(clone);
            } else {
                alert("La carte recherchée  n'existe pas");
            }

        }