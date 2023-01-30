import {
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  MapIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { CalendarIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Account from '../../../Account';
import { discardNotesChanges } from '../../../app/AccountModification';
import { Alert } from '../../../types/AlertTypes';
import {
  ContextMenu,
  ContextMenuData,
  UserOptions,
} from '../../../types/BaseTypes';
import { PlanSpecialFunctions } from '../../../types/PlanTypes';
import { ScheduleData } from '../../../types/ScheduleTypes';
import { exportScheduleAsICS } from '../../../utility/Calendar';
import { Mode } from '../../../utility/Constants';
import { exportScheduleAsImage } from '../../../utility/Image';
import Schedule from '../../schedule/Schedule';
import exportMenu from './Export';
import settingsMenu from './Settings';
import ToolbarAccount from './ToolbarAccount';
import ToolbarButton from './ToolbarButton';

interface ToolbarProps {
  alert: Alert;
  contextMenuData?: ContextMenuData;
  contextMenu: ContextMenu;
  schedule: ScheduleData;
  openMap?: () => void;
  switches: UserOptions;
  loading: boolean;
  f2: PlanSpecialFunctions;
  openAboutMenu: () => void;
}

function Toolbar({
  alert,
  contextMenuData,
  contextMenu,
  schedule,
  openMap,
  switches,
  loading,
  f2,
  openAboutMenu,
}: ToolbarProps) {
  const [takeImage, setTakeImage] = useState(false);

  const isSchedule = switches.get.mode === Mode.SCHEDULE;

  const theme = isSchedule ? 'green' : 'purple';

  const activeItem = isSchedule
    ? switches.get.active_schedule_id
      ? Account.getScheduleName(switches.get.active_schedule_id)
      : undefined
    : switches.get.active_plan_id
    ? Account.getPlanName(switches.get.active_plan_id)
    : undefined;

  useEffect(() => {
    if (takeImage) {
      exportScheduleAsImage(switches.get.dark).finally(() => {
        setTakeImage(false);
        toast.success('Exported schedule as image');
      });
    }
  }, [takeImage, switches]);

  return (
    <div className="sticky top-0 z-30 flex w-full flex-col items-center justify-center gap-1 bg-white px-4 pt-4 pb-2 dark:bg-gray-800 md:flex-row lg:justify-end">
      {activeItem && activeItem !== 'None' && (
        <div className="flex flex-1 items-center gap-2 overflow-hidden font-semibold text-gray-400">
          {isSchedule ? (
            <CalendarIcon className="h-5 w-5" />
          ) : (
            <RectangleStackIcon className="h-5 w-5" />
          )}
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {activeItem}
          </p>
        </div>
      )}
      <div className="flex gap-1">
        {isSchedule && (
          <ToolbarButton
            icon={MapIcon}
            onClick={() => {
              if (openMap) {
                openMap();
              }
            }}
          >
            Map
          </ToolbarButton>
        )}
        <ToolbarButton
          selected={switches.get.notes}
          icon={PencilSquareIcon}
          onClick={() => {
            if (switches.get.notes) {
              discardNotesChanges(switches, alert, () => {
                switches.set('notes', false);
                switches.set('unsaved_notes', false);
              });
            } else {
              switches.set('notes', true);
            }
          }}
        >
          Notes
        </ToolbarButton>

        <ToolbarButton
          icon={ArrowTopRightOnSquareIcon}
          active={contextMenuData?.name === 'export'}
          onClick={(x, y) => {
            contextMenu(
              exportMenu({
                x,
                y,
                theme,
                schedule: isSchedule ? schedule : undefined,
                alert,
                actions: {
                  link(text) {
                    if (!text) {
                      toast.error('Unable to copy URL');
                      return;
                    }
                    navigator.clipboard.writeText(text);
                    toast.success('URL copied to clipboard');
                  },
                  image() {
                    setTakeImage(true);
                  },
                  calendar(validSections) {
                    toast.promise(exportScheduleAsICS(validSections), {
                      loading: 'Exporting schedule...',
                      success: 'Exported schedule',
                      error: (res) => {
                        console.error(res);
                        return 'Failed to export schedule';
                      },
                    });
                  },
                },
              })
            );
          }}
        >
          Export
        </ToolbarButton>
        <ToolbarButton
          icon={Cog6ToothIcon}
          onClick={() => alert(settingsMenu(f2))}
        >
          Settings
        </ToolbarButton>
        <ToolbarAccount
          loading={loading}
          active={contextMenuData?.name === 'account'}
          onClick={(x, y, signedIn) => {
            if (!signedIn) {
              Account.logIn();
              return;
            }
            contextMenu({
              name: 'account',
              x,
              y,
              theme,
              items: [
                {
                  text: 'About Paper',
                  icon: InformationCircleIcon,
                  onClick: () => openAboutMenu(),
                },
                {
                  text: isSchedule ? 'Schedules' : 'Plans',
                  icon: isSchedule ? CalendarIcon : RectangleStackIcon,
                  onClick: () => {
                    switches.set('tab', 'Plans');
                  },
                },
                {
                  text: 'Manage account',
                  icon: UserCircleIcon,
                  onClick: () => {
                    window.open('https://auth.dilanxd.com/account', '_blank');
                  },
                },
                {
                  text: 'Sign out',
                  icon: ArrowRightOnRectangleIcon,
                  onClick: () => {
                    alert({
                      title: 'Logging out...',
                      message: `Are you sure you want to log out? Make sure your changes are saved!`,
                      cancelButton: 'Cancel',
                      confirmButton: 'Log out',
                      color: 'rose',
                      icon: ArrowRightOnRectangleIcon,
                      action: () => {
                        Account.logOut();
                      },
                    });
                  },
                },
              ],
            });
          }}
        />
      </div>
      {takeImage && (
        <div className="relative">
          <Schedule
            schedule={schedule}
            alert={alert}
            switches={switches}
            sf={undefined as any}
            ff={undefined as any}
            imageMode={true}
          />
        </div>
      )}
    </div>
  );
}

export default Toolbar;