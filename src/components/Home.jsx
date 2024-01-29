import {useEffect, useState} from "react";
import Choice from "./Choice";

export default function Home(){
    let [location, setLocation] = useState();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                console.log(position);
            },
            (e) => {},
            null);
    }, []);

    if (location)
        return <Choice location={location}/>
    else
        return(
            <>
                <div className={"text-center h4"}>
                    Please your enable your geolocation
                </div>
            </>
        )

}