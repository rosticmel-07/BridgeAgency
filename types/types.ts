import { services } from '@/data/services';
import { serviceDetails, type ServiceSlug } from '@/data/serviceDetails';
import { portfolioCases } from '@/data/PortfolioCase';

export type ServiceItem = (typeof services)[number];
export type ServiceDetail = (typeof serviceDetails)[ServiceSlug];
export type PortfolioCase = (typeof portfolioCases)[number];
