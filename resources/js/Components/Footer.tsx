export default function Footer() {
    return (
        <footer className="text-gray-400 text-sm max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-screen">
            <div className="flex flex-col lg:flex-row justify-center items-center text-center">
                <div>
                    <span className="inline-flex items-center">
                        &copy; 2023. Briel. App made with
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mx-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </span>
                        by
                        <a
                            href="https://brilian.me/"
                            className="ml-1"
                            target="_blank"
                        >
                            Briel
                        </a>
                        . Version 0.0.1
                    </span>
                </div>
            </div>
        </footer>
    );
}
