class MyGuideToCroatia {
    constructor() {
        this.travelsItems = document.querySelector('.travels-items');
        this.guideItems = document.querySelector('.guide-items');
        this.galleryImages = document.querySelector('.gallery-images');

        this.askName = document.querySelector('.ask-name');
        this.askEmail = document.querySelector('.ask-email');
        this.askMessage = document.querySelector('.ask-message');
        document.querySelector('.ask-submit').addEventListener('click', this.askMe.bind(this));
        document.querySelector('.travels-more').href = "javascript:myGuideToCroatia.travelsMore()";

        this.loadData();
    }

    loadData() {
        fetch('data/myData.json')
            .then(res => res.json())
            .then((out) => {
                console.log('Output: ', out);
                // Create travels Objects
                this.myData = out;
                this.createTravels(out.travels, 3);
                this.createGuides(out.guides);
                this.createGallery(out.gallery);
            }).catch(err => console.error(err));
    }

    createTravels(arr, cnt) {
        let index = 0;
        arr.forEach(element => {
            if (index < cnt) {
                const ci = document.querySelector(".travels-article-" + index);
                if (!ci) {
                    const i = index;
                    const articleElement = document.createElement("article");
                    articleElement.classList.add("travels-article-" + i);
                    const imgElement = document.createElement("img");
                    imgElement.classList.add("travels-img-" + i);
                    const h3Element = document.createElement("h3");
                    h3Element.classList.add("travels-h3-" + i);

                    imgElement.src = element.imageUrl;
                    imgElement.alt = element.label;

                    imgElement.addEventListener('click', event =>
                        this.handleTravelsClick(element, i, event)
                    )

                    h3Element.innerHTML = element.label;

                    articleElement.appendChild(imgElement);
                    articleElement.appendChild(h3Element);
                    this.travelsItems.appendChild(articleElement);
                }
            }
            index++;
            if (index >= cnt) {
                return;
            }
        });
    }

    handleTravelsClick(element, index, event) {
        const allfullImg = document.querySelectorAll('.img-full');
        if (allfullImg) {
            allfullImg.forEach(iel => {
                iel.classList.remove("img-full");
                if (iel.defaultLabel)
                    iel.innerHTML = iel.defaultLabel;
            });
        }
        const img = document.querySelector(".travels-img-" + index);
        const h3 = document.querySelector(".travels-h3-" + index);
        img.classList.add("img-full");
        h3.innerHTML = element.description;
        h3.defaultLabel = element.label;
        h3.classList.add("img-full");
    }

    travelsMore() {
        this.createTravels(this.myData.travels, 100);
    }

    createGuides(arr) {
        let index = 0;
        arr.forEach(element => {
            const i = index;
            const articleElement = document.createElement("article");
            const imgElement = document.createElement("img");
            const h3Element = document.createElement("h3");

            articleElement.classList.add("guides-article-" + i);
            imgElement.classList.add("guides-img-" + i);
            h3Element.classList.add("guides-h3-" + i);

            imgElement.src = element.imageUrl;
            imgElement.alt = element.label;
            imgElement.addEventListener('click', event =>
                this.handleGuidesClick(element, i, event)
            )

            h3Element.innerHTML = element.label;

            articleElement.appendChild(imgElement);
            articleElement.appendChild(h3Element);
            this.guideItems.appendChild(articleElement);
            index++;
        });
    }

    handleGuidesClick(element, index, event) {
        const allfullImg = document.querySelectorAll('.img-full');
        if (allfullImg) {
            allfullImg.forEach(iel => {
                iel.classList.remove("img-full");
                if (iel.defaultLabel)
                    iel.innerHTML = iel.defaultLabel;
            });
        }
        const img = document.querySelector(".guides-img-" + index);
        const h3 = document.querySelector(".guides-h3-" + index);
        img.classList.add("img-full");
        h3.innerHTML = element.description;
        h3.defaultLabel = element.label;
        h3.classList.add("img-full");
    }

    createGallery(arr) {
        let index = 0;
        arr.forEach(element => {
            const i = index;
            const imgElement = document.createElement("img");
            imgElement.classList.add("gallery-img-" + i);

            imgElement.src = element.imageUrl;
            imgElement.alt = element.label;
            imgElement.addEventListener('click', event =>
                this.handleGalleryClick(element, i, event)
            )

            this.galleryImages.appendChild(imgElement);
            index++;
        });
    }

    handleGalleryClick(element, index, event) {
        const allfullImg = document.querySelectorAll('.img-full');
        if (allfullImg) {
            allfullImg.forEach(iel => {
                iel.classList.remove("img-full");
                if (iel.defaultLabel)
                    iel.innerHTML = iel.defaultLabel;
            });
        }
        const img = document.querySelector(".gallery-img-" + index);
        img.classList.add("img-full");
    }

    askMe() {
        const askForm = {
            name: this.askName.value,
            Email: this.askEmail.value,
            message: this.askMessage.value
        };

        fetch('data/myForm.json', {
                method: "POST",
                body: JSON.stringify(askForm)
            })
            .then(res => res.json())
            .then((out) => {
                this.askName.value =
                    this.askEmail.value =
                    this.askMessage.value = "";
                alert('Thank you for your question.');
            }).catch(err => console.error(err));
    }

}
const myGuideToCroatia = new MyGuideToCroatia();