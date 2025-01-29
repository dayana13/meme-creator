import {
    useState,
    useEffect

} from "react";
export default function Main() {

    const [meme, setMeme] = useState({
        imageUrl: 'http://i.imgflip.com/1bij.jpg',
        topText: "One does not simply",
        bottomText: "Walk into Mordor"
    });

    const [allMemes, setAllMemes] = useState([])


    useEffect(() => {


        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => { console.log(data.data.memes); setAllMemes(data.data.memes) })

    }, [])
    function handleChange(event) {
        const { value, name } = event.currentTarget
        console.log(value)
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        })
        )
    }

    function handleGetMeme() {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const randomItem = allMemes[randomIndex];
        console.log(allMemes[randomIndex])
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: randomItem.url
        })
        )


    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={handleGetMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}