import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col} from "react-bootstrap";

import { HiArrowCircleRight } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import "../App.css"
import {useEffect, useState} from "react";

export default function Choice({location}) {
    let [activity, setActivity] = useState(null);
    let [loadingActivity, setLoadingActivity] = useState(true);
    let [liked, setLiked] = useState(false);

    useEffect(() => {
        onClickNext();
    }, []);

    return <>
        <Container
            className={"justify-content-center align-items-center shadow shadow-sm p-4 rounded"}
            style={{width: "40%", border: "3px green solid"}}>
            <Row className={"justify-content-center align-items-center"} style={{height: "300px"}}>
                <Col className={"h5 text-center"}>
                    {activity != null ? activity.description : null}
                </Col>
            </Row>
            { !activity || !activity.place ? "" :
            <Row className={"justify-content-center align-items-center "} style={{height: "300px"}}>
                <Col className={"justify-content-center align-items-center"}>
                    <iframe
                        width={"100%"}
                        height={"300px"}
                        style={{border: "1px red solid"}}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?&q=place_id:${activity.place.id}&key=AIzaSyBWjJdncL0342KaDcJLzpwA97omB9CjD8g`}>
                    </iframe>
                </Col>
            </Row>
            }
            <br/>
            <Row className={"text-center"}>
                <Col></Col>
                <Col className={"container shadow border border-3 border-dark rounded rounded-3"}>
                    <Row className={"justify-content-around align-items-center"}>
                        <Col>
                            <HiHeart size={"3em"} color={liked ? "pink" : "green"} onClick={onClickLike}/>
                        </Col>
                        <Col>
                            {
                                loadingActivity ?
                                <div className={"spinner-border"} style={{width: 38.4, height: 38.4}}></div>:
                                <HiArrowCircleRight size={"3em"} color={"green"} onClick={onClickNext}/>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </>

    function onClickNext() {
        const API_URL = "http://localhost:8080/api/activity";
        //location.coords.longitude
        const url = `${API_URL}?latitude=${48.864716}&longitude=${2.349014}`;

        setLoadingActivity(true);

        // construct the feedback object
        let body = {
            liked: liked,
            types: []
        };
        if (activity)
        {
            if (activity.place) {
                body.types = body.types.concat(activity.place.types);
            }
            if (activity.type)
                body.types.push(activity.type);
        }
        fetch(url , {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if(response.ok)
                    return response.json();
                else
                    throw  new Error(response.status)
            })
            .then(data => {
                // Handle the API response
                console.log('API Response:', data);
                setActivity(data);
                setLiked(false);
                setLoadingActivity(false);
            })
            .catch(error => {
                // Handle errors
                console.error('API Error:', error);
                setLoadingActivity(false);
                setLiked(false);
            });
    }
    function onClickLike() {
        setLiked(!liked);
    };

}