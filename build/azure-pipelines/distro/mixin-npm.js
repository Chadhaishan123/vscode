"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const { dirs } = require('../../npm/dirs');
function log(...args) {
    console.log(`[${new Date().toLocaleTimeString('en', { hour12: false })}]`, '[distro]', ...args);
}
function mixin(mixinPath) {
    if (!fs.existsSync(`${mixinPath}/node_modules`)) {
        log(`Skipping distro npm dependencies: ${mixinPath} (no node_modules)`);
        return;
    }
    log(`Mixing in distro npm dependencies: ${mixinPath}`);
    const distroPackageJson = JSON.parse(fs.readFileSync(`${mixinPath}/package.json`, 'utf8'));
    const targetPath = path.relative('.build/distro/npm', mixinPath);
    console.log(`./${targetPath}`, fs.statSync(`./${targetPath}`));
    console.log(`./${targetPath}/node_modules`, fs.statSync(`./${targetPath}/node_modules`));
    for (const dependency of Object.keys(distroPackageJson.dependencies)) {
        fs.rmSync(`./${targetPath}/node_modules/${dependency}`, { recursive: true, force: true });
        fs.cpSync(`${mixinPath}/node_modules/${dependency}`, `./${targetPath}/node_modules/${dependency}`, { recursive: true, force: true });
    }
    log(`Mixed in distro npm dependencies: ${mixinPath} ✔︎`);
}
function main() {
    log(`Mixing in distro npm dependencies...`);
    const mixinPaths = dirs.filter(d => /^.build\/distro\/npm/.test(d));
    for (const mixinPath of mixinPaths) {
        mixin(mixinPath);
    }
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4aW4tbnBtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWl4aW4tbnBtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O2dHQUdnRzs7QUFFaEcseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUF1QixDQUFDO0FBRWpFLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBVztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pHLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxTQUFpQjtJQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsZUFBZSxDQUFDLEVBQUU7UUFDaEQsR0FBRyxDQUFDLHFDQUFxQyxTQUFTLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsT0FBTztLQUNQO0lBRUQsR0FBRyxDQUFDLHNDQUFzQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRXZELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWpFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLGVBQWUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBRXpGLEtBQUssTUFBTSxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNyRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVSxpQkFBaUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFGLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLGlCQUFpQixVQUFVLEVBQUUsRUFBRSxLQUFLLFVBQVUsaUJBQWlCLFVBQVUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNySTtJQUVELEdBQUcsQ0FBQyxxQ0FBcUMsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1osR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFFNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBFLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1FBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQjtBQUNGLENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyJ9