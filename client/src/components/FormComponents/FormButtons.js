import React from 'react';
import { themeColor } from '../../style/theme';

export default function FormButtons({ onClick }) {
  return (
    <div className="float-right">
      <button
        type="button"
        onClick={onClick}
        style={{
          border: 'none',
          background: 'none',
          outline: 'none',
          marginRight: 20,
        }}
      >
        Reset
      </button>
      <input
        value="Save"
        type="submit"
        style={{
          background: themeColor.green,
          border: 'none',
          outline: 'none',
          padding: '5px 25px',
          borderRadius: '50px',
          color: '#fff',
        }}
      />
    </div>
  );
}
