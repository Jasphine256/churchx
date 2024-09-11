import Image from "next/image"

const BaseModal = ({isVisible, onClose, children, title}) => {
    if (!isVisible) return null;
    return (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 pointer-event-none">
            <article className="w-1/3 bg-white rounded-lg shadow-2xl transform transition-all sm:max-w-lg sm:-w-full">
                <div className="w-full flex items-center justify-between p-2 bg-blue-500">
                    <h3 className="font-bold text-white pl-3">{title}</h3>
                    <Image src={'/assets/icons/forward.svg'} alt="close button" width={20} height={20} onClick={onClose}></Image>
                </div>
                <div className="p-3">
                    {children}
                </div>
            </article>
        </section>
    )
}

export default BaseModal;