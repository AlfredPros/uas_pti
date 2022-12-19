import React from "react";

function Card(args) {
  return (
    <div className="row mb-5 justify-content-center">
      <div className="col-sm-6 col-10">
        <div className="card testimonial-card rounded-4">
          <div className="row card-body">
            <div className="col-7">
              <h3 className="card-title mb-5 mt-0">
                <b>{args.name}</b>
              </h3>
              <h5 className="card-text">{args.nim}</h5>
              <h5 className="card-text mb-4">{args.email}</h5>
            </div>
            <div className="col-5 text-end">
              <img
                className="w-100 border border-light border-4 rounded-circle mt-2"
                src={args.imgURL}
                draggable="false"
                onContextMenu={() => {
                  return false;
                }}
                alt="Member photo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
