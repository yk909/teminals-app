import Image from "next/image";
import homeImage from '../../../public/home.jpg';


const Home = () => {
    return (
        <div className="">
            <h1 className="text-3xl font-bold text-center">
                Commune Remote
            </h1>
            <div className="mt-5">
                <p className=" text-lg font-light text-center">
                    Imagine you have a magic wand that lets you talk to computers far away as if they were right in front of you. <span className="font-bold">Terminal-App</span> is like that magic wand for adults, letting them send messages (we call them "commands") to computers that are not next to them. It's like sending a letter to a friend who lives in another city, but much, much faster!
                </p>
            </div>
            <div className="mt-6 flex justify-center items-center">
                <Image src={homeImage} width={640} height={480} alt="HomeImage" />
            </div>
        </div>
    )
}


export default Home;