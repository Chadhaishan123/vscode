"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const cp = require("child_process");
const fs = require("fs");
const crypto = require("crypto");
function getParams(type) {
    switch (type) {
        case 'windows':
            return '[{"keyCode":"CP-230012","operationSetCode":"SigntoolSign","parameters":[{"parameterName":"OpusName","parameterValue":"VS Code"},{"parameterName":"OpusInfo","parameterValue":"https://code.visualstudio.com/"},{"parameterName":"Append","parameterValue":"/as"},{"parameterName":"FileDigest","parameterValue":"/fd \\"SHA256\\""},{"parameterName":"PageHash","parameterValue":"/NPH"},{"parameterName":"TimeStamp","parameterValue":"/tr \\"http://rfc3161.gtm.corp.microsoft.com/TSS/HttpTspServer\\" /td sha256"}],"toolName":"sign","toolVersion":"1.0"},{"keyCode":"CP-230012","operationSetCode":"SigntoolVerify","parameters":[{"parameterName":"VerifyAll","parameterValue":"/all"}],"toolName":"sign","toolVersion":"1.0"}]';
        case 'windows-appx':
            return '[{"keyCode":"CP-229979","operationSetCode":"SigntoolSign","parameters":[{"parameterName":"OpusName","parameterValue":"VS Code"},{"parameterName":"OpusInfo","parameterValue":"https://code.visualstudio.com/"},{"parameterName":"FileDigest","parameterValue":"/fd \\"SHA256\\""},{"parameterName":"PageHash","parameterValue":"/NPH"},{"parameterName":"TimeStamp","parameterValue":"/tr \\"http://rfc3161.gtm.corp.microsoft.com/TSS/HttpTspServer\\" /td sha256"}],"toolName":"sign","toolVersion":"1.0"},{"keyCode":"CP-229979","operationSetCode":"SigntoolVerify","parameters":[],"toolName":"sign","toolVersion":"1.0"}]';
        case 'rpm':
            return '[{ "keyCode": "CP-450779-Pgp", "operationSetCode": "LinuxSign", "parameters": [], "toolName": "sign", "toolVersion": "1.0" }]';
        case 'darwin-sign':
            return '[{"keyCode":"CP-401337-Apple","operationSetCode":"MacAppDeveloperSign","parameters":[{"parameterName":"Hardening","parameterValue":"--options=runtime"}],"toolName":"sign","toolVersion":"1.0"}]';
        case 'darwin-notarize':
            return '[{"keyCode":"CP-401337-Apple","operationSetCode":"MacAppNotarize","parameters":[],"toolName":"sign","toolVersion":"1.0"}]';
        default:
            throw new Error(`Sign type ${type} not found`);
    }
}
function main([esrpCliPath, type, cert, username, password, folderPath, pattern]) {
    tmp.setGracefulCleanup();
    const patternPath = tmp.tmpNameSync();
    fs.writeFileSync(patternPath, pattern);
    const paramsPath = tmp.tmpNameSync();
    fs.writeFileSync(paramsPath, getParams(type));
    const keyFile = tmp.tmpNameSync();
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    fs.writeFileSync(keyFile, JSON.stringify({ key: key.toString('hex'), iv: iv.toString('hex') }));
    const clientkeyPath = tmp.tmpNameSync();
    const clientkeyCypher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let clientkey = clientkeyCypher.update(password, 'utf8', 'hex');
    clientkey += clientkeyCypher.final('hex');
    fs.writeFileSync(clientkeyPath, clientkey);
    const clientcertPath = tmp.tmpNameSync();
    const clientcertCypher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let clientcert = clientcertCypher.update(cert, 'utf8', 'hex');
    clientcert += clientcertCypher.final('hex');
    fs.writeFileSync(clientcertPath, clientcert);
    const args = [
        esrpCliPath,
        'vsts.sign',
        '-a', username,
        '-k', clientkeyPath,
        '-z', clientcertPath,
        '-f', folderPath,
        '-p', patternPath,
        '-u', 'false',
        '-x', 'regularSigning',
        '-b', 'input.json',
        '-l', 'AzSecPack_PublisherPolicyProd.xml',
        '-y', 'inlineSignParams',
        '-j', paramsPath,
        '-c', '9997',
        '-t', '120',
        '-g', '10',
        '-v', 'Tls12',
        '-s', 'https://api.esrp.microsoft.com/api/v1',
        '-m', '0',
        '-o', 'Microsoft',
        '-i', 'https://www.microsoft.com',
        '-n', '5',
        '-r', 'true',
        '-e', keyFile,
    ];
    try {
        cp.execFileSync('dotnet', args, { stdio: 'inherit' });
    }
    catch (err) {
        console.error('ESRP failed');
        console.error(err);
        process.exit(1);
    }
}
exports.main = main;
if (require.main === module) {
    main(process.argv.slice(2));
    process.exit(0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7QUFFaEcsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixpQ0FBaUM7QUFFakMsU0FBUyxTQUFTLENBQUMsSUFBWTtJQUM5QixRQUFRLElBQUksRUFBRTtRQUNiLEtBQUssU0FBUztZQUNiLE9BQU8sd3NCQUF3c0IsQ0FBQztRQUNqdEIsS0FBSyxjQUFjO1lBQ2xCLE9BQU8saW1CQUFpbUIsQ0FBQztRQUMxbUIsS0FBSyxLQUFLO1lBQ1QsT0FBTywrSEFBK0gsQ0FBQztRQUN4SSxLQUFLLGFBQWE7WUFDakIsT0FBTyxrTUFBa00sQ0FBQztRQUMzTSxLQUFLLGlCQUFpQjtZQUNyQixPQUFPLDJIQUEySCxDQUFDO1FBQ3BJO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLElBQUksWUFBWSxDQUFDLENBQUM7S0FDaEQ7QUFDRixDQUFDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFXO0lBQ2hHLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRXpCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV2QyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFOUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFD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