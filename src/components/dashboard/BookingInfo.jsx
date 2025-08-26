function BookingInfo() {
  return (
    <div className="p-6 rounded-2xl shadow bg-white border">
      <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Booking Date:</span> {}
        </p>
        <p>
          <span className="font-medium">Checkout Date:</span> {}
        </p>
      </div>
    </div>
  );
}

export default BookingInfo;
