const SuccessModal = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl">
                <p className='text-[#083F46] font-medium text-[30px]'>Your contact has been deleted successfully!</p>
                <div className="flex justify-center mt-4">
                    <button onClick={onClose} className="px-6 py-1 border border-[#083F46] text-white bg-[#083F46] font-semibold rounded-full text-[28px]">Okay</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal