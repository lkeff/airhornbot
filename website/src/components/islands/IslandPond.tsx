type Props = {
  paused: boolean;
};

export default ({ paused }: Props) => (
  <svg className={`island pond ${paused ? 'paused' : ''}`} xmlns="http://www.w3.org/2000/svg" width="259" height="251">
    <g fill="none" fill-rule="evenodd">
      <path fill="#FFE6A7" d="M1.5012 123.2279v57.903l118.413 68.367 136.734-78.942v-57.903l-255.147 10.575z" />
      <path fill="#EDD194" d="M118.8135 118.3652v130.5l1.101.633 136.734-78.942v-57.903l-137.835 5.712z" />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M256.6494 112.6514v57.906l-136.734 78.942-118.416-68.367v-57.906"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path fill="#C7E082" d="M1.5012 123.2279v20.403l118.413 68.37 136.734-78.945v-20.403l-255.147 10.575z" />
      <path fill="#B0CC64" d="M119.8134 118.3235v93.618l.102.06 136.734-78.945v-20.406l-136.836 5.673z" />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M256.6494 115.6514v17.406l-136.734 78.942-118.416-68.367v-20.406"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path fill="#B7D86F" d="M1.5012 123.2279l118.413 68.367 136.734-78.942-118.413-68.367-136.734 78.942z" />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M119.9151 191.5949l-118.416-68.367 136.734-78.945 118.416 68.37-136.734 78.942zm0 0v57.906"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        fill="#EBEBEB"
        d="M139.5984 88.3538h-6.684c-.735 0-1.335-.6-1.335-1.338v-.555c0-1.776 1.452-3.231 3.231-3.231h2.895c1.776 0 3.231 1.455 3.231 3.231v.555c0 .738-.603 1.338-1.338 1.338"
      />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M139.5984 88.3538h-6.684c-.735 0-1.335-.6-1.335-1.338v-.555c0-1.776 1.452-3.231 3.231-3.231h2.895c1.776 0 3.231 1.455 3.231 3.231v.555c0 .738-.603 1.338-1.338 1.338z"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        fill="#EBEBEB"
        d="M224.4243 115.7492h-6.684c-.735 0-1.335-.6-1.335-1.338v-.555c0-1.776 1.452-3.231 3.231-3.231h2.895c1.776 0 3.231 1.455 3.231 3.231v.555c0 .738-.603 1.338-1.338 1.338"
      />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M224.4243 115.7492h-6.684c-.735 0-1.335-.6-1.335-1.338v-.555c0-1.776 1.452-3.231 3.231-3.231h2.895c1.776 0 3.231 1.455 3.231 3.231v.555c0 .738-.603 1.338-1.338 1.338z"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <g className="leaves">
        <path
          fill="#C3F270"
          d="M44.5425 43.1987v-.006h.006c5.562-2.721 12.024 1.44 11.853 7.632v.006h-.006c-5.565 2.721-12.027-1.443-11.853-7.632"
        />
        <path
          stroke="#5E4634"
          strokeWidth="3"
          d="M44.5425 43.1987v-.006h.006c5.562-2.721 12.024 1.44 11.853 7.632v.006h-.006c-5.565 2.721-12.027-1.443-11.853-7.632z"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <path
          fill="#C3F270"
          d="M244.911 69.3206l-.006-.003v-.003c-.738-6.15 5.319-10.884 11.106-8.685l.006.003v.003c.738 6.15-5.316 10.884-11.106 8.685"
        />
        <path
          stroke="#5E4634"
          strokeWidth="3"
          d="M244.911 69.3206l-.006-.003v-.003c-.738-6.15 5.319-10.884 11.106-8.685l.006.003v.003c.738 6.15-5.316 10.884-11.106 8.685z"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g className="trunk">
        <path fill="#FFE6A7" d="M178.4487 88.4339v20.922c0 2.115 4.155 3.831 9.282 3.831s9.282-1.716 9.282-3.831v-20.922h-18.564z" />
        <path fill="#EDD194" d="M188.5242 88.4339v24.72c4.749-.168 8.49-1.794 8.49-3.798v-20.922h-8.49z" />
        <path
          stroke="#5E4634"
          strokeWidth="3"
          d="M178.4487 88.4339v20.922c0 2.115 4.155 3.831 9.282 3.831s9.282-1.716 9.282-3.831v-20.922h-18.564z"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g className="cone stretch">
        <path
          fill="#C3F270"
          d="M192.159 5.513l28.392 77.583c1.35 3.69.078 7.899-3.216 10.044-4.755 3.093-13.617 6.492-29.604 6.492-15.984 0-24.846-3.399-29.604-6.492-3.291-2.145-4.566-6.354-3.216-10.044l28.392-77.583c1.509-4.125 7.347-4.125 8.856 0"
        />
        <path
          fill="#B7D86F"
          d="M220.551 83.0972l-28.392-77.583c-1.509-4.128-7.344-4.128-8.856 0l-2.265 6.186 24.549 67.083c1.353 3.69.078 7.899-3.216 10.041-4.755 3.093-13.617 6.495-29.604 6.495-4.647 0-8.676-.294-12.195-.78 5.148 2.637 13.575 5.094 27.159 5.094 15.987 0 24.849-3.402 29.604-6.495 3.294-2.142 4.566-6.351 3.216-10.041"
        />
        <path
          stroke="#5E4634"
          strokeWidth="3"
          d="M192.159 5.513l28.392 77.583c1.35 3.69.078 7.899-3.216 10.044-4.755 3.093-13.617 6.492-29.604 6.492-15.984 0-24.846-3.399-29.604-6.492-3.291-2.145-4.566-6.354-3.216-10.044l28.392-77.583c1.509-4.125 7.347-4.125 8.856 0z"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
      </g>
      <path
        fill="#DCFAFF"
        d="M142.4742 139.9199c-18.018 10.404-45.276 11.532-60.879 2.523-15.603-9.009-13.647-24.744 4.371-35.148 18.018-10.404 45.276-11.532 60.879-2.523 15.603 9.009 13.647 24.744-4.371 35.148"
      />
      <path
        stroke="#5E4634"
        strokeWidth="3"
        d="M142.4742 139.9199c-18.018 10.404-45.276 11.532-60.879 2.523-15.603-9.009-13.647-24.744 4.371-35.148 18.018-10.404 45.276-11.532 60.879-2.523 15.603 9.009 13.647 24.744-4.371 35.148zm28.4703-17.9376v3.249m-124.125-20.3841v3.249m84.7596-64.3347v3.249m-6.3846-.0411v3.249m-84.375 63.8079v3.249m79.0956-22.9104v3.249m3.5919 67.251v3.249m-6.5625-5.9133v3.249m-5.25-70.0104v3.249"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <g className="lines">
        <path
          stroke="#5E4634"
          strokeWidth="3"
          d="M238.2762 74.7497c-2.823 2.31-6.318 3.783-9.942 4.194m28.1892-38.1513c-.522-10.671-5.535-21.048-13.569-28.089s-18.978-10.653-29.625-9.774M66.3516 53.7239c8.178 3.357 17.154 4.758 25.965 4.05"
          strokeLinecap="round"
          stroke-linejoin="round"
          strokeDasharray="6 12"
        />
      </g>
    </g>
  </svg>
);
