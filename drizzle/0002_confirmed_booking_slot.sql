-- Fail rather than silently discard any pre-existing duplicate confirmed bookings.
ALTER TABLE `bookings`
  ADD COLUMN `confirmedSlot` varchar(16)
    GENERATED ALWAYS AS (CASE WHEN `status` = 'confirmed' THEN CONCAT(`date`, 'T', `time`) ELSE NULL END) STORED,
  ADD CONSTRAINT `bookings_confirmedSlot_unique` UNIQUE (`confirmedSlot`);
