const SecurityDisclaimer = () => {
  return (
    <div className="bg-orange-50 dark:bg-amber-900/20 border-l-4 border-[#F59E0B] p-4 rounded-md mb-12">
      <div className="flex">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-triangle text-[#F59E0B]"></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-[#F59E0B]">Ethical Usage Notice</h3>
          <div className="mt-2 text-sm text-orange-700 dark:text-orange-200">
            <p>
              This platform is intended solely for educational purposes. NetExec is a powerful tool that should only be used in environments where you have explicit permission. Unauthorized network scanning and penetration attempts may violate legal and ethical standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDisclaimer;
