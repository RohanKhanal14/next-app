export default function UserProfile ({params}:any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen" >
            <h1>profile page </h1>
            <h1>{params.id}</h1>
        </div>
    )
}