import { useParams } from "react-router-dom";
export function MultipleDynamicParams(){
    const {userId, orderId} = useParams();
    return(
        <div>
            <h2>Multiple Dynamic Params</h2>
            <p>User Id from URL : {userId}</p>
            <p>Order Id from URL : {orderId}</p>
        </div>
    )
}