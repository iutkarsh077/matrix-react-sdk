/*
 *
 * Copyright 2024 The Matrix.org Foundation C.I.C.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * /
 */

import React, { forwardRef, HTMLProps } from "react";
import { Icon } from "@vector-im/compound-design-tokens/icons/threads-solid.svg";
import classNames from "classnames";

import { _t } from "../../../../languageHandler";
import AccessibleTooltipButton from "../../elements/AccessibleTooltipButton";

interface ThreadActivityCentreButtonProps extends HTMLProps<HTMLDivElement> {
    /**
     * Display the `Treads` label next to the icon.
     */
    displayLabel?: boolean;
}

/**
 * A button to open the thread activity centre.
 */
export const ThreadActivityCentreButton = forwardRef<HTMLDivElement, ThreadActivityCentreButtonProps>(
    function ThreadActivityCentreButton({ displayLabel, ...props }, ref): React.JSX.Element {
        return (
            <AccessibleTooltipButton
                className={classNames("mx_ThreadActivityCentreButton", { expanded: displayLabel })}
                title={_t("common|threads")}
                // @ts-ignore
                // ref nightmare...
                ref={ref}
                forceHide={displayLabel}
                aria-expanded={displayLabel}
                {...props}
            >
                <Icon className="mx_ThreadActivityCentreButton_Icon" />
                {displayLabel && _t("common|threads")}
            </AccessibleTooltipButton>
        );
    },
);
