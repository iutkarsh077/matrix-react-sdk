/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { forwardRef } from "react";
import classNames from "classnames";

import { formatCount } from "../../../../utils/FormattingUtils";
import AccessibleButton, { ButtonEvent } from "../../elements/AccessibleButton";
import { NotificationLevel } from "../../../../stores/notifications/NotificationLevel";
import { useSettingValue } from "../../../../hooks/useSettings";
import { XOR } from "../../../../@types/common";

interface Props {
    symbol: string | null;
    count: number;
    level: NotificationLevel;
    knocked?: boolean;
    /**
     * If true, the badge will always be displayed as a dot. Count will be ignored.
     */
    forceDot?: boolean;
}

interface ClickableProps extends Props {
    /**
     * If specified will return an AccessibleButton instead of a div.
     */
    onClick(ev: ButtonEvent): void;
    tabIndex?: number;
}

export const StatelessNotificationBadge = forwardRef<HTMLDivElement, XOR<Props, ClickableProps>>(
    ({ symbol, count, level, knocked, forceDot = false, ...props }, ref) => {
        const hideBold = useSettingValue("feature_hidebold");

        // Don't show a badge if we don't need to
        if ((level === NotificationLevel.None || (hideBold && level == NotificationLevel.Activity)) && !knocked) {
            return <></>;
        }

        const hasUnreadCount = level >= NotificationLevel.Notification && (!!count || !!symbol);

        const isEmptyBadge = symbol === null && count === 0;

        if (symbol === null && count > 0) {
            symbol = formatCount(count);
        }

        // We show a dot if either:
        // * The props force us to, or
        // * It's just an activity-level notification or (in theory) lower and the room isn't knocked
        const badgeType = forceDot || (level <= NotificationLevel.Activity && !knocked) ? "dot" : "badge";

        const classes = classNames({
            mx_NotificationBadge: true,
            mx_NotificationBadge_visible: isEmptyBadge || knocked ? true : hasUnreadCount,
            mx_NotificationBadge_level_notification: level == NotificationLevel.Notification,
            mx_NotificationBadge_level_highlight: level >= NotificationLevel.Highlight,
            mx_NotificationBadge_dot: badgeType === "dot",
            mx_NotificationBadge_knocked: knocked,
            mx_NotificationBadge_2char: badgeType === "badge" && (!symbol || symbol.length < 3),
            mx_NotificationBadge_3char: badgeType === "badge" && symbol && symbol.length > 2,
        });

        if (props.onClick) {
            return (
                <AccessibleButton {...props} className={classes} onClick={props.onClick} ref={ref}>
                    <span className="mx_NotificationBadge_count">{symbol}</span>
                    {props.children}
                </AccessibleButton>
            );
        }

        return (
            <div className={classes} ref={ref}>
                <span className="mx_NotificationBadge_count">{symbol}</span>
            </div>
        );
    },
);
