const EmptyState = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
            <div className="w-full max-w-lg mb-12">
                <div className="relative h-64 w-64 mx-auto mb-10">
                    <div className="absolute inset-0 bg-secondary-container/30 rounded-full blur-3xl" />
                    <div className="relative h-full w-full bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-[48px] flex items-center justify-center overflow-hidden">
                        <div className="absolute w-32 h-32 bg-primary/10 rounded-full -top-8 -right-8" />
                        <div className="absolute w-20 h-20 bg-tertiary-container/40 rounded-full -bottom-4 -left-4" />
                        <div className="flex flex-col items-center">
                            <span
                                className="material-symbols-outlined text-primary text-7xl font-light mb-4"
                                style={{ fontVariationSettings: "'wght' 200" }}
                            >
                                spa
                            </span>
                            <div className="w-12 h-0.5 bg-outline-variant/30 rounded-full" />
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
                    Your archive is clear.
                </h2>
                <p className="text-on-surface-variant text-lg font-body max-w-sm mx-auto leading-relaxed">
                    Time for a deep breath or a new thought. Every empty archive is an opportunity for
                    clarity.
                </p>
            </div>
            <div className="flex gap-6">
                <button
                    type="button"
                    className="flex items-center gap-2 text-primary font-semibold hover:bg-primary/5 px-6 py-3 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">history</span>
                    View History
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 text-on-surface-variant font-semibold hover:bg-surface-container-high px-6 py-3 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">auto_stories</span>
                    Read Journal
                </button>
            </div>
        </section>
    )
}

export default EmptyState