import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useRef, useState } from 'react';
import { UserOptions } from '../../../types/BaseTypes';
import { SideCardData } from '../../../types/SideCardTypes';
import SideCardButton from './SideCardButton';
import SideCardItem from './SideCardItem';

interface SideCardProps {
  data: SideCardData;
  switches: UserOptions;
  onClose: () => void;
}

function SideCard({ data, switches, onClose }: SideCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const initialFocus = useRef(null);

  function close() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={initialFocus}
        className={`${switches.get.dark ? 'dark' : ''} relative z-40`}
        onClose={() => close()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => onClose()}
        >
          <div className="fixed inset-0 bg-black bg-opacity-10" />
        </Transition.Child>
        <div className="fixed top-0 right-0 h-screen w-screen px-4 py-8 md:max-w-md">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="translate-x-[448px]"
            enterTo="translate-x-0"
            leave="ease-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[448px]"
          >
            <Dialog.Panel className="no-scrollbar h-full w-full overflow-y-scroll rounded-xl bg-white p-4 shadow-xl dark:bg-gray-700">
              <div
                ref={initialFocus}
                className="mb-8 flex w-full items-center gap-2"
              >
                <p
                  className={`text-${data.themeColor}-400 flex-grow text-sm font-bold tracking-wider`}
                >
                  {data.type}
                </p>
                <div>
                  <button
                    className="flex items-center text-gray-600 hover:text-red-400 active:text-red-500 dark:text-gray-500 dark:hover:text-red-400 dark:active:text-red-300"
                    onClick={() => close()}
                  >
                    <XMarkIcon className="h-7 w-7" />
                  </button>
                </div>
              </div>
              {data.alertMessage && (
                <div className="my-4 rounded-lg border-2 border-red-500 bg-red-100 p-2 dark:border-red-400 dark:bg-gray-700">
                  <p className="text-center text-sm font-medium text-red-600 dark:text-red-300">
                    {data.alertMessage}
                  </p>
                </div>
              )}
              <p
                className={`text-center text-2xl font-bold text-gray-800 dark:text-gray-50 sm:text-left`}
              >
                {data.title}
              </p>
              {data.subtitle && (
                <p className="text-center text-lg font-light text-gray-800 dark:text-gray-100 sm:text-left">
                  {data.subtitle}
                </p>
              )}
              {data.message && (
                <p className="my-4 text-sm text-gray-600 dark:text-gray-400">
                  {data.message}
                </p>
              )}
              {data.items && (
                <div className="mt-4">
                  {data.items.map((item, i) => (
                    <SideCardItem
                      key={`side-card-item-${i}`}
                      data={item}
                      color={data.themeColor}
                    />
                  ))}
                </div>
              )}
              {data.buttons && (
                <div className="m-4 mt-8">
                  {data.buttons.map((button, i) => (
                    <SideCardButton
                      key={`side-card-button-${i}`}
                      data={button}
                      close={close}
                    />
                  ))}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SideCard;
