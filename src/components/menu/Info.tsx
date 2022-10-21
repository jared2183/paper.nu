import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Mode } from '../../utility/Constants';

interface InfoProps {
  mode: Mode;
}

class Info extends React.Component<InfoProps> {
  render() {
    return (
      <div
        className={`flex items-center gap-2 justify-center mt-4 mb-2 px-4 py-2 text-center whitespace-nowrap border-2 border-black dark:border-white
                dark:bg-gray-800 rounded-xl transition-all duration-300 text-black dark:text-white`}
      >
        <PaperAirplaneIcon className="w-6 h-6 drop-shadow-md" />
        <p className="font-light drop-shadow-md text-2xl tracking-wide">
          paper
        </p>
      </div>
    );
  }
}

export default Info;
