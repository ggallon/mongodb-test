const CardFooter = ({ bgray, children }) => {
  return (
    <div className={`${bgray ? 'bg-gray-50' : 'border-t border-gray-200'} px-4 py-5 sm:px-6`}>
      {children}
    </div>
  );
};

export default CardFooter;
