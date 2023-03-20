import { useState } from "react"


export default function Meme(){
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://source.unsplash.com/JmuyB_LibRo"
    })

    const [allMemes, setAllMemes] = useState([])

    useState(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    console.log(allMemes)

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.lenght)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    
    return (
       <main className='content'>

            <div className='form'>
                <input
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <button className='form-button'>Generate meme</button>

                <div className="meme">
                    <img src={meme.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>


            
                
            
            <div className='meme-section'>

            </div>
       </main>
    )
}