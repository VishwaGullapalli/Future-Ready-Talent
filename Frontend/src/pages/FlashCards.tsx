import Cards from "@/componenets/Cards"

const FlashCards = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Flashcards</h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Explore the flashcards to experience the fun and easier experience like never before in last minute prep.</p>
                </div>
                {/* <TableComponent /> */}
                <Cards _id={""} Question={""} Option1={""} Option2={""} Option3={""} Option4={""} Solution={""} />
            </div>
        </section>
    )
}

export default FlashCards