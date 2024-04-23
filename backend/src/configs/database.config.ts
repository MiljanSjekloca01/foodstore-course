import { ConnectOptions,connect } from "mongoose";
// ConnectOptions su vrv depraceted i ne moraju da se stavljaju.
export const dbConnect = () => {
    connect(process.env.MONGO_URI!).then(
        () => console.log("Connected successfully"),
        (error) => console.log(error)
    )
}

/*
, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)*/ 