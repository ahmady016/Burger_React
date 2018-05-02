import React from "react";
import AppState from "./../Common/AppState";

export default () => {
  const { order, reset } = AppState;
  return (
    <div id="modal1" className="modal">
      <div className="modal-content left-align">
        <pre>{JSON.stringify(order, null, 3)}</pre>
      </div>
      <div class="modal-footer">
        <button className="modal-action modal-close waves-effect waves-green btn btn-flat"
                onClick={() => reset()}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};
