/**
 * @fileoverview JSDoc type definitions for the Eureka Frontend application
 * This file contains all TypeScript-like type definitions using JSDoc syntax
 * Import these types in other files using: @typedef {import('./types/jsdoc-types').TypeName} TypeName
 */

// =============================================================================
// COMMON TYPES
// =============================================================================

/**
 * Multilingual content structure
 * @typedef {Object} LocalesField
 * @property {Object} locales - Language-specific content
 * @property {string} locales.en - English content
 * @property {string} [locales.fr] - French content (optional)
 */

/**
 * Base entity with common properties
 * @typedef {Object} BaseEntity
 * @property {string} id - Unique identifier
 * @property {string} createdAt - Creation timestamp (ISO format)
 * @property {string} updatedAt - Last update timestamp (ISO format)
 */

/**
 * Geographic coordinates
 * @typedef {Object} Coordinates
 * @property {number} lat - Latitude coordinate
 * @property {number} long - Longitude coordinate
 */

/**
 * Status type for entities
 * @typedef {'draft'|'published'} Status
 */

// =============================================================================
// API TYPES
// =============================================================================

/**
 * @typedef {Object} FetchStateType
 * @property {any} error
 * @property {boolean} isLoading
 * @property {boolean} isError
 * @property {boolean} isSuccess
 */

/**
 * @template T
 * @typedef {Object} FetchResultType
 * @property {T} data - The fetched data
 * @property {FetchStateType} fetchState - The fetch state
 */

// =============================================================================
// PROJECT TYPES
// =============================================================================

/**
 * Project schema
 * @typedef {Object} Project
 * @property {string} id - The unique identifier for the project
 * @property {LocalesField} title - The multilingual title of the project
 * @property {LocalesField} description - The multilingual description of the project
 * @property {string} thumbnail - The URL of the project's thumbnail image
 * @property {string} coverPhoto - The URL of the project's cover photo
 * @property {Tour[]} tours - Array of tours associated with this project
 * @property {User[]} members - Members of the project
 * @property {Status} [status] - Project status (draft, published, archived)
 * @property {string} lastUpdated - Last updated date in ISO format
 */

// =============================================================================
// TOUR TYPES
// =============================================================================

/**
 * Tour schema
 * @typedef {Object} Tour
 * @property {string} id - Unique identifier for the tour
 * @property {LocalesField} title - Tour title
 * @property {LocalesField} description - Tour description
 * @property {string} thumbnail - Tour thumbnail image URL
 * @property {Poi[]} pois - Array of Points of Interest in this tour
 * @property {Status} status - Tour status (draft, published, archived)
 * @property {number} duration - Estimated duration in minutes
 * @property {number} distance - Estimated distance in meters
 * @property {Coordinates} [coordinates] - Geographic coordinates
 * @property {Coordinates[]} [boundBox] - Bounding box of the tour pois
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

// =============================================================================
// POI TYPES
// =============================================================================

/**
 * Point of Interest schema
 * @typedef {Object} Poi
 * @property {string} id - Unique identifier for the POI
 * @property {LocalesField} title - POI title
 * @property {LocalesField} description - POI description
 * @property {Coordinates} coordinates - Geographic location
 * @property {string} thumbnail - POI thumbnail image URL
 * @property {PoiAsset[]} assets - Associated media assets
 * @property {ExternalLink[]} externalLinks - Associated external links
 * @property {ExternalLink[]} quizLinks - Associated quiz links
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * External link structure
 * @typedef {Object} ExternalLink
 * @property {string} title - Link title
 * @property {string} url - Link URL
 */

// =============================================================================
// MEDIA TYPES
// =============================================================================

/**
 * Media asset schema
 * @typedef {Object} Asset
 * @property {string} id - Unique identifier for the media asset
 * @property {LocalesField} title - Media title
 * @property {LocalesField} [description] - Media description (optional)
 * @property {string} contentUrl - The URL of the asset's main content (e.g., image, video, etc.)
 * @property {string} filename - The filename of the asset
 * @property {string} landingPage - The URL of the asset's landing page
 * @property {string} source - The source URL of the asset
 * @property {AssetType} type - Media type (image, video, audio, 3d_model, text)
 * @property {MediaMetadata} [metadata] - Additional metadata
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * POI-specific asset schema extending the base Asset type
 * @typedef {Asset & {priority: AssetPriority, modelAssetAttributes: ModelAssetAttributes}} PoiAsset
 */

/**
 * Asset Types
 * @typedef {'image'|'video'|'audio'|'3d'|'text'} AssetType
 */

/**
 * Asset Priority
 * @typedef {'normal'|'high'} AssetPriority
 */

/**
 * 3d Model Attributes
 * @typedef {Object} ModelAssetAttributes
 * @property {boolean} viewInAr - Indicates if the asset can be viewed in AR
 * @property {Asset} linkedAsset - Linked asset information
 * @property {Coordinates} georeference - Geographical reference for the asset
 */

/**
 * Media metadata for additional information
 * @typedef {Object} MediaMetadata
 * @property {number} [width] - Image/video width in pixels
 * @property {number} [height] - Image/video height in pixels
 * @property {number} [duration] - Video/audio duration in seconds
 * @property {string} [format] - Media format details
 * @property {string} [photographer] - Photographer/creator name
 * @property {string} [capturedAt] - When the media was captured
 */

// =============================================================================
// USER TYPES
// =============================================================================

/**
 * User schema
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} email - User email address
 * @property {string} username - Unique username
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} [avatar] - Avatar image URL
 * @property {UserRole} [role] - User role (admin, editor, viewer)
 */

/**
 * User Role
 * @typedef {'admin'|'editor'|'viewer'} UserRole
 */

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Standard API response wrapper
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {T} [data] - Response data (when successful)
 * @property {string} [message] - Success or error message
 * @property {ApiError[]} [errors] - Array of validation errors
 */

/**
 * API error structure
 * @typedef {Object} ApiError
 * @property {string} field - Field that caused the error
 * @property {string} message - Error message
 * @property {string} code - Error code
 */

/**
 * Paginated response structure
 * @template T
 * @typedef {Object} PaginatedResponse
 * @property {T[]} data - Array of items
 * @property {PaginationMeta} pagination - Pagination metadata
 */

/**
 * Pagination metadata
 * @typedef {Object} PaginationMeta
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} total - Total number of items
 * @property {number} pages - Total number of pages
 */

// Export empty object to make this a module
export {};
