class ProductCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    static get observedAttributes() {
        return ["product-image", "product-name", "product-price", "product-collection"];
    }
    attributeChangedCallback(attr, oldVal, newVal){
        if(attr === "product-image") {
            this.productImage = newVal;
        }
        if(attr === "product-name") {
            this.productName = newVal;
        }
        if(attr === "product-price") {
            this.productPrice = newVal;
        }
        if(attr === "product-collection") {
            this.productCollection = newVal;
        }
    }
    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = `
            <main class="container">
                <section class="img-box">
                    <p>NIKE</p>
                    <img src=${this.productImage} alt="Sport shoe Nike">
                </section>
                <section class="details">
                    <div class="content">
                        <h2>${this.productName}</h2>
                        <span>${this.productCollection}</span>
                    </div>
                    <p><slot name="product-description"></slot>
                    </p>
                    <div class="buy-container">
                        <button>Comprar</button>
                        <h3>$${this.productPrice}</h3>
                    </div>
                </section>
            </main>
            ${this.getStyles()}
        `;
        return template;
    }
    getStyles(){
        return `
        <style>
            :host{
                --main-color: #5a6cb2;
                --secondary-color: #2d3a6d;
                font-size: 62.5%;
                background-color: var(--main-color);
                width: 80%;
                max-width: 900px;
                min-width: 280px;
            }
            .container{
                position: relative;
                display: flex;
                flex-wrap: wrap;
                width: calc(100% * 13/14);
                min-width: 260px;
                max-width: 850px;
                height: 480px;
                margin: 10px auto;
                background-color: #fff;
            }
            .img-box{
                position: relative;
                width: 100%;
                min-width: 260px;
                height: 50%;
                min-height: 160px;
                background-color: var(--main-color);
            }
            .img-box p{
                position: absolute;
                font-size: 4rem;
                margin: 10px 0;
                color: var(--secondary-color);
                letter-spacing: 5px;
                font-weight: bold;
            }
            .img-box img{
                position: absolute;
                width: 95%;
                max-width: 900px;
                min-width: 200px;
                margin-top: 110px;
                margin-left: 15px;
            }
            .details{
                display: flex;
                flex-direction: column;
                width: 260px;
                height: 340px;
                padding: 20px 5px 10px 8px;
            }
            .content h2{
                font-size: 1.2rem;
                letter-spacing: 1px;
            }
            .content span{
                font-size: 1rem;
            }
            .details p{
                font-size: 0.9rem;
            }
            .buy-container{
                position: relative;
                width: 100px;
                height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-left: 20px;
            }
            .details button{
                width: 100px;
                border: solid 1px var(--secondary-color);
                border-radius: 10px;
                padding: 4px;
                background-color: transparent;
            }
            .details h3{
                position: absolute;
                font-size: 2.2rem;
                letter-spacing: 3px;
                margin-left: 220px;
            }
            @media (min-width: 700px){
                .img-box{
                    width: calc(100% * 4/7);
                    height: 100%;
                }
                .img-box p{
                    font-size: 5rem;
                    letter-spacing: 4px;
                }
                .img-box img{
                    margin-top: 80px;
                    margin-left: -100px; 
                    width: 600px;
                    transform: rotate(-35deg);
                }
            }
        </style>
        `;
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("product-card", ProductCard);