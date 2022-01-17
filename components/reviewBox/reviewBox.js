import reviewBoxStyle from './reviewBox.module.css'

export default function ReviewBox(props) {
    return (
        <Review />
    )
}

export function Review(props) {
    const user = "Ashford"
    const review = "The greatest parts of this album are the small moments that help it become more than just another angry hardcore release. The songwriting flourishes are so beautifully placed throughout the album that it is impossible to get bored in an already short runtime. The closed hi-hat breakdown at the end of “Cloth Ears” which leads perfectly into the aforementioned “High Hopes” intro. The bass breakdown that closes out lead single “Self-Destruct,” another track that has a stellar groove in the verses, with Matt’s vocal delivery and cadence only adding to it. The riff within the bridge and outro of “The Truest Love” which is already a huge standout of the album on its own, with, again, Matt’s furious lyrical flow and delivery grabbing the listener’s attention with ease. To name and spoil every small detail of the record would be doing a disservice to the listener, as it is indescribably fun to pick out favorite moments in the tracklist."
    return(
        <div className={reviewBoxStyle.albumNote}>
            <div className={reviewBoxStyle.profileInfo}>
                {user}
            </div>
            <div className={reviewBoxStyle.reviewInfo}>
                {review}
            </div>
        </div>
    )
}