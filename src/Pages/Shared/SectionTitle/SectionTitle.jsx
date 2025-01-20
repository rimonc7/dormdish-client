const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className="text-center m-6 mx-auto md:w-4/12">
            <h3 className="text-4xl border-y-4 py-3 mt-2 border-orange-400 font-bold">
                {heading}
            </h3>
            <p className="italic text-xl mt-2">
                {subheading}
            </p>
        </div>
    );
};

export default SectionTitle;
