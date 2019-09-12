import { GlobalWithFetchMock } from 'jest-fetch-mock';
import * as enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
global = customGlobal;
